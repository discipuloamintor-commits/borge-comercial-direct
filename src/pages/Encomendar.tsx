import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, CalendarDays, User, Phone, MapPin, Send, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice, WHATSAPP_NUMBER } from "@/data/products";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface OrderItem {
    productId: string;
    quantity: number;
    saleType: 'grosso' | 'unidade';
}

const Encomendar = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("todos");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryPeriod, setDeliveryPeriod] = useState("manha");
    const [notes, setNotes] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<Record<string, 'grosso' | 'unidade'>>({});

    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
    const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data, error } = await supabase.from("categories").select("*").order("name");
            if (error) throw error;
            return data;
        },
        staleTime: 5 * 60 * 1000,
    });

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const { data, error } = await supabase.from("products").select("*, categories(name, slug)").order("name");
            if (error) throw error;
            return data;
        },
        staleTime: 5 * 60 * 1000,
    });

    // Get the minimum date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    // Filter products by category
    const filteredProducts = selectedCategory === "todos"
        ? products
        : products.filter((p: any) => p.categories?.slug === selectedCategory);

    // Add or update item quantity
    const updateItem = (productId: string, delta: number, saleType: 'grosso' | 'unidade' = 'grosso') => {
        setOrderItems(prev => {
            const existing = prev.find(item => item.productId === productId && item.saleType === saleType);
            if (existing) {
                const newQty = existing.quantity + delta;
                if (newQty <= 0) return prev.filter(item => !(item.productId === productId && item.saleType === saleType));
                return prev.map(item => item.productId === productId && item.saleType === saleType ? { ...item, quantity: newQty } : item);
            }
            if (delta > 0) return [...prev, { productId, quantity: delta, saleType }];
            return prev;
        });
    };

    const removeItem = (productId: string, saleType: 'grosso' | 'unidade') => {
        setOrderItems(prev => prev.filter(item => !(item.productId === productId && item.saleType === saleType)));
    };

    const getItemQuantity = (productId: string, saleType: 'grosso' | 'unidade' = 'grosso') => {
        return orderItems.find(item => item.productId === productId && item.saleType === saleType)?.quantity || 0;
    };

    const totalPrice = orderItems.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return sum;
        const price = item.saleType === 'unidade' ? (product.price_unit || 0) : product.price;
        return sum + (price * item.quantity);
    }, 0);

    const totalItemsCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    const hasGrossoItems = orderItems.some(i => i.saleType === 'grosso');
    const grossoItemsCount = orderItems.filter(i => i.saleType === 'grosso').reduce((sum, item) => sum + item.quantity, 0);
    const hasDelivery = totalPrice >= 25000;
    const canSubmitOrder = !hasGrossoItems || grossoItemsCount >= 10;

    // Handle auto-add from URL parameter
    useEffect(() => {
        const productSlug = searchParams.get("produto");
        if (productSlug && products.length > 0) {
            const product = products.find((p: any) => p.slug === productSlug);
            if (product) {
                const saleType = 'grosso' as const;
                if (!orderItems.some(i => i.productId === product.id && i.saleType === saleType)) {
                    setOrderItems([{ productId: product.id, quantity: 1, saleType }]);
                    navigate("/encomendar", { replace: true });
                }
            }
        }
    }, [searchParams, products, navigate]);

    // Format delivery period
    const periodLabels: Record<string, string> = {
        manha: "Manhã (08h - 12h)",
        tarde: "Tarde (12h - 17h)",
        noite: "Noite (17h - 20h)",
    };

    // Generate WhatsApp message
    const generateMessage = () => {
        const lines: string[] = [];
        lines.push("📦 *ENCOMENDA POR GROSSO*");
        lines.push("━━━━━━━━━━━━━━━━━━━━");
        lines.push("");
        lines.push("👤 *Dados do Cliente:*");
        lines.push(`• Nome: ${customerName}`);
        lines.push(`• Telefone: ${customerPhone}`);
        if (hasDelivery) {
            lines.push(`• Morada: ${customerAddress}`);
            lines.push("");
            lines.push("📅 *Entrega Agendada:*");
            if (deliveryDate) {
                const date = new Date(deliveryDate + "T12:00:00");
                const formatted = date.toLocaleDateString("pt-MZ", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
                lines.push(`• Data: ${formatted}`);
            }
            lines.push(`• Período: ${periodLabels[deliveryPeriod]}`);
        } else {
            lines.push("");
            lines.push("📍 *Método de Receção:* Levantamento na Loja (Praça dos Combatentes - Mercado Xiquelene)");
        }

        lines.push("");
        lines.push("🛒 *Produtos:*");
        lines.push("─────────────────────");

        orderItems.forEach((item, index) => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const typeLabel = item.saleType === 'unidade' ? " (Unidade)" : " (Grosso)";
                const price = item.saleType === 'unidade' ? (product.price_unit || 0) : product.price;
                lines.push(`${index + 1}. ${product.name}${typeLabel}`);
                lines.push(`   Qtd: ${item.quantity} × ${formatPrice(price)} = *${formatPrice(price * item.quantity)}*`);
            }
        });

        lines.push("─────────────────────");
        lines.push(`💰 *TOTAL: ${formatPrice(totalPrice)}*`);
        if (!hasDelivery) {
            lines.push("⚠️ _(As entregas estão incluídas apenas em encomendas superiores a 25.000 MT)_");
        }

        if (notes.trim()) {
            lines.push("");
            lines.push("📝 *Observações:*");
            lines.push(notes);
        }

        lines.push("");
        lines.push("━━━━━━━━━━━━━━━━━━━━");
        lines.push("_Enviado pelo formulário de Grosso do site Borge Comercial_");

        return lines.join("\n");
    };

    const isFormValid = customerName.trim() && customerPhone.trim() && (!hasDelivery || (customerAddress.trim() && deliveryDate));
    const canSubmit = orderItems.length > 0 && isFormValid && canSubmitOrder;

    const handleSubmit = () => {
        if (!canSubmit) return;
        const message = generateMessage();
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero */}
                <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.25)_0%,_transparent_60%)]" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                    <div
                        ref={heroRef}
                        className={`relative container mx-auto px-4 py-14 md:py-20 text-center animate-hidden ${heroVisible ? "animate-visible" : ""}`}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
                            <Package className="h-4 w-4 text-emerald-300" />
                            Venda por Grosso
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                            Faça a sua Encomenda
                        </h1>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Selecione os produtos, escolha as quantidades e agende a entrega. Nós tratamos do resto!
                        </p>
                    </div>
                </section>

                <div
                    ref={formRef}
                    className={`container mx-auto px-4 py-10 md:py-14 animate-hidden ${formVisible ? "animate-visible" : ""}`}
                >
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left: Product Selection */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Category Filter */}
                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <ShoppingCart className="h-5 w-5 text-primary" />
                                    1. Selecione os Produtos
                                </h2>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    <button
                                        onClick={() => setSelectedCategory("todos")}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === "todos" ? "bg-primary text-primary-foreground shadow-green" : "bg-muted text-muted-foreground hover:bg-primary/10"}`}
                                    >
                                        Todos
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat.slug}
                                            onClick={() => setSelectedCategory(cat.slug)}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat.slug ? "bg-primary text-primary-foreground shadow-green" : "bg-muted text-muted-foreground hover:bg-primary/10"}`}
                                        >
                                            {cat.image} {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Product Grid */}
                            {isLoading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card animate-pulse">
                                            <div className="w-16 h-16 rounded-xl bg-secondary flex-shrink-0" />
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-secondary/80 rounded block w-3/4" />
                                                <div className="h-4 bg-secondary/80 rounded block w-1/4" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {filteredProducts.map((product: any) => {
                                        const defaultType = product.sales_type === 'unidade' ? 'unidade' : 'grosso';
                                        const currentSaleType = product.sales_type === 'ambos' ? (selectedTypes[product.id] || 'grosso') : defaultType;

                                        const qtyGrosso = getItemQuantity(product.id, 'grosso');
                                        const qtyUnidade = getItemQuantity(product.id, 'unidade');
                                        const totalQty = qtyGrosso + qtyUnidade;
                                        const currentQty = currentSaleType === 'grosso' ? qtyGrosso : qtyUnidade;
                                        const priceToDisplay = currentSaleType === 'unidade' ? (product.price_unit || 0) : product.price;

                                        return (
                                            <div
                                                key={product.id}
                                                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${totalQty > 0 ? "border-primary bg-primary/5 shadow-md scale-[1.01]" : "border-border/50 bg-card hover:border-primary/30 hover:shadow-premium"}`}
                                            >
                                                <div className="w-16 h-16 rounded-xl bg-secondary flex-shrink-0 overflow-hidden">
                                                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" loading="lazy" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-sm text-foreground truncate">{product.name}</p>
                                                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                                                        <p className="text-sm font-bold text-primary">
                                                            {formatPrice(priceToDisplay)}
                                                        </p>
                                                        {product.sales_type === 'ambos' && (
                                                            <select
                                                                className="text-xs border border-input bg-background rounded px-1.5 py-0.5 outline-none focus:ring-1 focus:ring-primary/50 text-muted-foreground"
                                                                value={currentSaleType}
                                                                onChange={(e) => setSelectedTypes(prev => ({ ...prev, [product.id]: e.target.value as 'grosso' | 'unidade' }))}
                                                            >
                                                                <option value="grosso">Grosso</option>
                                                                <option value="unidade">Unidade</option>
                                                            </select>
                                                        )}
                                                        {product.sales_type === 'unidade' && (
                                                            <span className="text-[10px] px-1.5 py-0.5 bg-secondary/50 rounded-md text-muted-foreground uppercase font-bold tracking-wider">Unidade</span>
                                                        )}
                                                        {product.sales_type === 'grosso' && (
                                                            <span className="text-[10px] px-1.5 py-0.5 bg-secondary/50 rounded-md text-muted-foreground uppercase font-bold tracking-wider">Grosso</span>
                                                        )}
                                                    </div>
                                                    {product.available ? (
                                                        <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider mt-1">Em Estoque</p>
                                                    ) : (
                                                        <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider mt-1">Esgotado</p>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-2 items-end">
                                                    <div className="flex items-center gap-1.5" title="Adicionar">
                                                        {currentQty > 0 && (
                                                            <button onClick={() => updateItem(product.id, -1, currentSaleType)} className="w-7 h-7 rounded-md border border-primary/30 text-primary flex items-center justify-center bg-white hover:bg-primary/10 transition-colors">
                                                                <Minus className="h-3.5 w-3.5" />
                                                            </button>
                                                        )}
                                                        {currentQty > 0 && <span className="w-5 text-center font-bold text-xs text-foreground">{currentQty}</span>}
                                                        <button onClick={() => updateItem(product.id, 1, currentSaleType)} disabled={!product.available} className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${!product.available ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"}`}>
                                                            <Plus className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Right: Order Summary + Customer Info */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-20 space-y-6">
                                {/* Order Summary */}
                                <div className="rounded-2xl border border-border/50 bg-card shadow-premium p-6">
                                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                        <ShoppingCart className="h-4 w-4 text-primary" />
                                        Resumo ({orderItems.length} {orderItems.length === 1 ? "produto" : "produtos"})
                                    </h3>
                                    {orderItems.length === 0 ? (
                                        <p className="text-sm text-muted-foreground py-4 text-center">
                                            Adicione produtos para começar a sua encomenda
                                        </p>
                                    ) : (
                                        <div className="space-y-3 mb-4">
                                            {orderItems.map(item => {
                                                const product = products.find(p => p.id === item.productId);
                                                if (!product) return null;
                                                const price = item.saleType === 'unidade' ? (product.price_unit || 0) : product.price;
                                                const typeLabel = item.saleType === 'unidade' ? ' (Un)' : ' (Grs)';
                                                return (
                                                    <div key={`${item.productId}-${item.saleType}`} className="flex items-center justify-between gap-2">
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-foreground truncate">{product.name} <span className="text-xs text-muted-foreground font-normal">{typeLabel}</span></p>
                                                            <p className="text-xs text-muted-foreground">{item.quantity} × {formatPrice(price)}</p>
                                                        </div>
                                                        <p className="text-sm font-bold text-foreground whitespace-nowrap">{formatPrice(price * item.quantity)}</p>
                                                        <button onClick={() => removeItem(item.productId, item.saleType)} className="p-1 text-muted-foreground hover:text-red-500 transition-colors">
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {orderItems.length > 0 && (
                                        <div className="border-t border-border pt-4 mt-2">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-medium text-muted-foreground text-sm">Quantidade Total:</span>
                                                <span className={`font-bold ${totalItemsCount < 10 ? "text-red-500" : "text-foreground"}`}>{totalItemsCount} unid.</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-foreground text-lg">Total Encomenda:</span>
                                                <span className="text-xl font-extrabold text-primary">{formatPrice(totalPrice)}</span>
                                            </div>
                                            {!hasDelivery && (
                                                <p className="text-xs text-amber-600 mt-2 p-2 bg-amber-500/10 rounded border border-amber-500/20">
                                                    <strong>Atenção:</strong> Venda inferior a 25.000 MT.<br />Deverá ser levantada na Loja (não inclui transporte).
                                                </p>
                                            )}
                                            {hasGrossoItems && grossoItemsCount > 0 && grossoItemsCount < 10 && (
                                                <p className="text-xs text-destructive mt-2 p-2 bg-destructive/10 rounded border border-destructive/20 font-medium">
                                                    A venda por grosso requer um mínimo de 10 unidades no total da componente grossista.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Customer Info */}
                                <div className="rounded-2xl border border-border/50 bg-card shadow-premium p-6 space-y-4">
                                    <h3 className="font-bold text-foreground flex items-center gap-2">
                                        <User className="h-4 w-4 text-primary" />
                                        2. Os Seus Dados
                                    </h3>
                                    <div>
                                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Nome completo *</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={customerName}
                                                onChange={e => setCustomerName(e.target.value)}
                                                placeholder="Ex: Maria Santos"
                                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Telefone / WhatsApp *</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <input
                                                type="tel"
                                                value={customerPhone}
                                                onChange={e => setCustomerPhone(e.target.value)}
                                                placeholder="Ex: 84 123 4567"
                                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                            />
                                        </div>
                                    </div>
                                    {hasDelivery ? (
                                        <>
                                            <div>
                                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Endereço de entrega *</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                    <textarea
                                                        value={customerAddress}
                                                        onChange={e => setCustomerAddress(e.target.value)}
                                                        placeholder="Ex: Av. Julius Nyerere, nº 123, Maputo"
                                                        rows={2}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
                                            <h4 className="font-bold text-orange-800 text-sm mb-1 flex items-center gap-1.5">
                                                <MapPin className="h-4 w-4" /> Levantamento Físico
                                            </h4>
                                            <p className="text-sm text-orange-700">
                                                A sua encomenda não atinge o valor mínimo de <strong>25.000 MT</strong> para entrega gratuita. Por favor, desloque-se à <strong>Praça dos Combatentes - Mercado Xiquelene, Maputo</strong> para realizar o levantamento físico dos produtos.
                                            </p>    </div>
                                    )}
                                </div>

                                {/* Delivery Scheduling */}
                                {hasDelivery && (
                                    <div className="rounded-2xl border border-border/50 bg-card shadow-premium p-6 space-y-4">
                                        <h3 className="font-bold text-foreground flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 text-primary" />
                                            3. Agendar Entrega
                                        </h3>
                                        <div>
                                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Data de entrega *</label>
                                            <input
                                                type="date"
                                                value={deliveryDate}
                                                onChange={e => setDeliveryDate(e.target.value)}
                                                min={minDate}
                                                className="w-full h-11 px-4 rounded-xl border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Período preferido</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {Object.entries(periodLabels).map(([key, label]) => (
                                                    <button
                                                        key={key}
                                                        onClick={() => setDeliveryPeriod(key)}
                                                        className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${deliveryPeriod === key ? "bg-primary text-primary-foreground shadow-green" : "bg-muted text-muted-foreground hover:bg-primary/10"}`}
                                                    >
                                                        {label.split(" ")[0]}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="rounded-2xl border border-border/50 bg-card shadow-premium p-6 space-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Observações (opcional)</label>
                                        <textarea
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                            placeholder={hasDelivery ? "Ex: Entregar no portão lateral..." : "Instruções sobre o dia ou forma de levantamento..."}
                                            rows={2}
                                            className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={!canSubmit}
                                    className={`w-full h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-300 ${canSubmit
                                        ? "bg-[#25D366] text-white hover:bg-[#20BD5A] hover:scale-[1.02] shadow-lg cursor-pointer"
                                        : "bg-muted text-muted-foreground cursor-not-allowed"
                                        }`}
                                >
                                    <Send className="h-5 w-5" />
                                    Enviar Encomenda pelo WhatsApp
                                </button>
                                {!canSubmit && orderItems.length > 0 && (
                                    <p className="text-xs text-center text-muted-foreground">
                                        Preencha todos os campos obrigatórios (*)
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default Encomendar;
