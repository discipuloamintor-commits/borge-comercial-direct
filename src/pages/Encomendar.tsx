import { useState } from "react";
import { ShoppingCart, Trash2, Plus, Minus, CalendarDays, User, Phone, MapPin, Send, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { products, categories, formatPrice, WHATSAPP_NUMBER } from "@/data/products";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface OrderItem {
    productId: string;
    quantity: number;
}

const Encomendar = () => {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("todos");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryPeriod, setDeliveryPeriod] = useState("manha");
    const [notes, setNotes] = useState("");

    const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
    const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

    // Get the minimum date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    // Filter products by category
    const filteredProducts = selectedCategory === "todos"
        ? products
        : products.filter(p => p.categorySlug === selectedCategory);

    // Add or update item quantity
    const updateItem = (productId: string, delta: number) => {
        setOrderItems(prev => {
            const existing = prev.find(item => item.productId === productId);
            if (existing) {
                const newQty = existing.quantity + delta;
                if (newQty <= 0) return prev.filter(item => item.productId !== productId);
                return prev.map(item => item.productId === productId ? { ...item, quantity: newQty } : item);
            }
            if (delta > 0) return [...prev, { productId, quantity: delta }];
            return prev;
        });
    };

    const removeItem = (productId: string) => {
        setOrderItems(prev => prev.filter(item => item.productId !== productId));
    };

    const getItemQuantity = (productId: string) => {
        return orderItems.find(item => item.productId === productId)?.quantity || 0;
    };

    // Calculate total
    const totalPrice = orderItems.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

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
        lines.push(`• Endereço: ${customerAddress}`);
        lines.push("");
        lines.push("📅 *Entrega Agendada:*");
        if (deliveryDate) {
            const date = new Date(deliveryDate + "T12:00:00");
            const formatted = date.toLocaleDateString("pt-MZ", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
            lines.push(`• Data: ${formatted}`);
        }
        lines.push(`• Período: ${periodLabels[deliveryPeriod]}`);
        lines.push("");
        lines.push("🛒 *Produtos:*");
        lines.push("─────────────────────");

        orderItems.forEach((item, index) => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                lines.push(`${index + 1}. ${product.name}`);
                lines.push(`   Qtd: ${item.quantity} × ${formatPrice(product.price)} = *${formatPrice(product.price * item.quantity)}*`);
            }
        });

        lines.push("─────────────────────");
        lines.push(`💰 *TOTAL: ${formatPrice(totalPrice)}*`);

        if (notes.trim()) {
            lines.push("");
            lines.push("📝 *Observações:*");
            lines.push(notes);
        }

        lines.push("");
        lines.push("━━━━━━━━━━━━━━━━━━━━");
        lines.push("_Enviado pelo site Borge Comercial_");

        return lines.join("\n");
    };

    const canSubmit = orderItems.length > 0 && customerName.trim() && customerPhone.trim() && customerAddress.trim() && deliveryDate;

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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {filteredProducts.map(product => {
                                    const qty = getItemQuantity(product.id);
                                    return (
                                        <div
                                            key={product.id}
                                            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${qty > 0 ? "border-primary/30 bg-primary/5 shadow-sm" : "border-border/50 bg-card hover:border-border"}`}
                                        >
                                            <div className="w-16 h-16 rounded-xl bg-secondary flex-shrink-0 overflow-hidden">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm text-foreground truncate">{product.name}</p>
                                                <p className="text-sm font-bold text-primary">{formatPrice(product.price)}</p>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                {qty > 0 && (
                                                    <button
                                                        onClick={() => updateItem(product.id, -1)}
                                                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
                                                    >
                                                        <Minus className="h-3.5 w-3.5" />
                                                    </button>
                                                )}
                                                {qty > 0 && (
                                                    <span className="w-8 text-center font-bold text-sm">{qty}</span>
                                                )}
                                                <button
                                                    onClick={() => updateItem(product.id, 1)}
                                                    className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-accent transition-colors"
                                                >
                                                    <Plus className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
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
                                                return (
                                                    <div key={item.productId} className="flex items-center justify-between gap-2">
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                                                            <p className="text-xs text-muted-foreground">{item.quantity} × {formatPrice(product.price)}</p>
                                                        </div>
                                                        <p className="text-sm font-bold text-foreground whitespace-nowrap">{formatPrice(product.price * item.quantity)}</p>
                                                        <button onClick={() => removeItem(item.productId)} className="p-1 text-muted-foreground hover:text-red-500 transition-colors">
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {orderItems.length > 0 && (
                                        <div className="border-t border-border pt-4 flex justify-between items-center">
                                            <span className="font-semibold text-foreground">Total:</span>
                                            <span className="text-xl font-extrabold text-primary">{formatPrice(totalPrice)}</span>
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
                                </div>

                                {/* Delivery Scheduling */}
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
                                    <div>
                                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Observações (opcional)</label>
                                        <textarea
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                            placeholder="Ex: Entregar no portão lateral, tocar a campainha..."
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
