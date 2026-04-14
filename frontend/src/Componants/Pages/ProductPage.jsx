import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addToCartRedux } from "../../Redux/cartSlice";

const LeafIcon = ({ size = 16, color = "#16a34a" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <path d="M12 2C6 2 3 7 3 12c0 3 1.5 5.5 4 7l1-3c-1.5-1-2.5-2.5-2.5-4 0-3 2-6 6.5-6.5C16 5 19 8 19 12c0 2-1 4-3 5.5L17 21c3-2 4-5 4-9 0-5.5-4-10-9-10z" fill={color} opacity="0.3" />
        <path d="M12 2C9 8 9 14 12 22M12 22C10 16 7 12 3 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const StarRating = ({ rating = 4.5, count = 0 }) => {
    const stars = Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < Math.round(rating) ? "#f59e0b" : "#d1d5db", fontSize: "14px" }}>★</span>
    ));
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ display: "flex" }}>{stars}</div>
            {count > 0 && (
                <span style={{ fontSize: "13px", color: "#6b7280" }}>
                    {rating} · {count.toLocaleString()} reviews
                </span>
            )}
        </div>
    );
};

const Badge = ({ children, color = "green" }) => {
    const colors = {
        green: { bg: "#dcfce7", text: "#15803d", border: "#bbf7d0" },
        amber: { bg: "#fef9c3", text: "#92400e", border: "#fde68a" },
        blue: { bg: "#dbeafe", text: "#1e40af", border: "#bfdbfe" },
    };
    const c = colors[color] || colors.green;
    return (
        <span style={{
            background: c.bg, color: c.text, border: `1px solid ${c.border}`,
            fontSize: "11px", fontWeight: "600", padding: "3px 10px",
            borderRadius: "20px", letterSpacing: "0.04em", textTransform: "uppercase",
            display: "inline-flex", alignItems: "center", gap: "4px",
        }}>
            {children}
        </span>
    );
};

const Toast = ({ show, message }) => (
    <div style={{
        position: "fixed", top: "20px", right: "20px",
        background: "#14532d", color: "#dcfce7",
        padding: "12px 20px", borderRadius: "10px", fontSize: "14px",
        opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(-10px)",
        transition: "opacity 0.3s, transform 0.3s",
        pointerEvents: "none", zIndex: 9999,
        display: "flex", alignItems: "center", gap: "8px",
    }}>
        <LeafIcon size={16} color="#86efac" /> {message}
    </div>
);

const CareTag = ({ icon, label, value }) => (
    <div style={{
        background: "#f0fdf4", border: "1px solid #bbf7d0",
        borderRadius: "10px", padding: "12px 10px",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "4px", flex: 1, minWidth: "64px",
    }}>
        <span style={{ fontSize: "20px" }}>{icon}</span>
        <span style={{ fontSize: "10px", color: "#6b7280", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.04em", textAlign: "center" }}>{label}</span>
        <span style={{ fontSize: "11px", color: "#166534", fontWeight: "600", textAlign: "center" }}>{value}</span>
    </div>
);

const TABS = ["About this Plant", "Care Guide", "Reviews"];

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState(0);
    const [toast, setToast] = useState({ show: false, message: "" });
    const [addingToCart, setAddingToCart] = useState(false);
    const [buyingNow, setBuyingNow] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        fetchProduct();
    }, [productId]);

    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: "" }), 2500);
    };

    const getUserCredentials = () => {
        const storedUser = JSON.parse(localStorage.getItem("user")) || {};
        return {
            userId: user?._id || storedUser?._id,
            token: user?.token || storedUser?.token,
        };
    };

    const handleAddToCart = async () => {
        const { userId, token } = getUserCredentials();
        if (!userId) {
            alert("Please log in to add items to the cart.");
            navigate("/login");
            return;
        }
        setAddingToCart(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/cart/add`,
                { userId, productId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                dispatch(addToCartRedux({ ...product, quantity }));
                showToast("Added to cart!");
            } else {
                alert("Failed to add to cart.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Error adding to cart.");
        } finally {
            setAddingToCart(false);
        }
    };

    const handleBuyNow = async () => {
        const { userId } = getUserCredentials();
        if (!userId) {
            alert("Please log in to continue.");
            navigate("/login");
            return;
        }
        setBuyingNow(true);
        await handleAddToCart();
        setBuyingNow(false);
        navigate("/cart");
    };

    if (!product) {
        return (
            <div style={{
                minHeight: "100vh", background: "#f0fdf4",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: "16px",
            }}>
                <style>{`@keyframes sway { 0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)} }`}</style>
                <div style={{ fontSize: "40px", animation: "sway 1.5s ease-in-out infinite", transformOrigin: "bottom center" }}>🌱</div>
                <p style={{ color: "#16a34a", fontSize: "15px", fontWeight: "500" }}>Growing your page…</p>
            </div>
        );
    }

    const originalPrice = Math.round(product.price * 1.35);
    const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

    return (
        <>
            <style>{`
            @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
            .plant-img:hover { transform: scale(1.05) !important; }
            .qty-btn:hover { background: #dcfce7 !important; }
        `}</style>

            <Toast show={toast.show} message={toast.message} />

            <div className="bg-green-50 min-h-screen pb-12 animate-[fadeIn_0.4s_ease]">

                {/* Breadcrumb */}
                <div className="bg-white border-b border-green-100 py-2.5">
                    <div className="max-w-[1100px] mx-auto px-5 flex items-center gap-1.5 text-[13px] text-gray-500">
                        <span onClick={() => navigate("/")} className="cursor-pointer text-green-600 flex items-center gap-1">
                            <LeafIcon size={13} /> Home
                        </span>
                        <span>›</span>
                        <span onClick={() => navigate("/shop")} className="cursor-pointer text-green-600 capitalize">
                            {product.category}
                        </span>
                        <span>›</span>
                        <span className="text-gray-700 truncate max-w-[280px]">
                            {product.name}
                        </span>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="max-w-[1100px] mx-auto mt-5 px-5">
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 items-start">

                        {/* LEFT */}
                        <div className="sticky top-5">
                            <div className="bg-white rounded-[20px] border border-green-100 overflow-hidden shadow-[0_4px_24px_rgba(22,163,74,0.08)]">

                                {/* Image */}
                                <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 aspect-square flex items-center justify-center overflow-hidden p-5">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="plant-img w-full h-full object-contain transition-transform duration-400"
                                    />
                                </div>

                                {/* Pot Size */}
                                <div className="px-5 py-4 border-t border-green-50">
                                    <p className="text-[12px] font-semibold text-gray-500 mb-2.5 uppercase tracking-wider">
                                        Pot Size
                                    </p>
                                    <div className="flex gap-2">
                                        {[{ label: 'Small (4″)', active: true }, { label: 'Medium (6″)', active: false }, { label: 'Large (8″)', active: false }].map(({ label, active }) => (
                                            <button key={label}
                                                className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition 
                                            ${active ? "border-[1.5px] border-green-600 bg-green-50 text-green-700" : "border border-green-100 bg-white text-gray-500"}`}>
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="px-5 pb-5 flex flex-col gap-2.5">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={addingToCart}
                                        className={`w-full py-3 rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2 text-white transition
                                    ${addingToCart ? "bg-green-200 cursor-not-allowed" : "bg-green-600 hover:bg-orange-400"}`}
                                    >
                                        🛒 {addingToCart ? "Adding to Cart…" : "Add to Cart"}
                                    </button>

                                    <button
                                        onClick={handleBuyNow}
                                        disabled={buyingNow}
                                        className="w-full py-3 rounded-xl text-[15px] font-semibold flex items-center justify-center gap-2 border-[1.5px] border-green-600 text-green-600 hover:bg-green-50 transition hover:border-orange-400"
                                    >
                                        ⚡ {buyingNow ? "Processing…" : "Buy Now"}
                                    </button>
                                </div>
                            </div>

                            {/* Delivery */}
                            <div className="bg-white rounded-[14px] border border-green-100 p-4 mt-3.5 flex flex-col gap-2.5">
                                {[
                                    { icon: "🚚", label: "Free delivery", sub: "on orders above ₹499" },
                                    { icon: "🌿", label: "Live plant guarantee", sub: "Healthy on arrival or replaced" },
                                    { icon: "📦", label: "Safe packaging", sub: "Eco-friendly plant-safe boxes" },
                                    { icon: "↩", label: "7-day returns", sub: "Hassle-free replacement policy" },
                                ].map(({ icon, label, sub }) => (
                                    <div key={label} className="flex gap-2.5 items-start">
                                        <span className="text-[16px] mt-[1px]">{icon}</span>
                                        <div>
                                            <p className="text-[13px] font-semibold text-green-800">{label}</p>
                                            <p className="text-[12px] text-gray-500">{sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-col gap-4">

                            {/* Title & Price */}
                            <div className="bg-white rounded-[16px] border border-green-100 p-6 shadow-[0_2px_12px_rgba(22,163,74,0.06)]">

                                <div className="flex gap-2 mb-3 flex-wrap">
                                    <Badge color="green">🌱 In Stock</Badge>

                                    {product.category && (
                                        <Badge
                                            color={
                                                product.category.toLowerCase().includes("indoor")
                                                    ? "blue"
                                                    : product.category.toLowerCase().includes("outdoor")
                                                        ? "green"
                                                        : "amber"
                                            }
                                        >
                                            {product.category}
                                        </Badge>
                                    )}
                                </div>

                                <h1 className="text-[22px] font-bold text-green-900 mb-1 leading-[1.35]">
                                    {product.name}
                                </h1>

                                <p className="text-[13px] text-gray-500 italic mb-2.5">
                                    A beautiful addition to your green space
                                </p>

                                <StarRating rating={4.6} count={892} />

                                <div className="h-px bg-green-50 my-4" />

                                <div className="flex items-baseline gap-2.5 flex-wrap">
                                    <span className="text-[32px] font-bold text-green-700">
                                        ₹{product.price.toLocaleString()}
                                    </span>
                                    <span className="text-[14px] text-gray-400 line-through">
                                        ₹{originalPrice.toLocaleString()}
                                    </span>
                                    <span className="bg-yellow-100 text-yellow-800 text-[12px] font-bold px-2 py-[3px] rounded">
                                        {discountPercent}% OFF
                                    </span>
                                </div>

                                <p className="text-[12px] text-gray-400 mt-1">
                                    Inclusive of pot & soil · Free delivery above ₹499
                                </p>

                                {/* Quantity */}
                                <div className="mt-4">
                                    <p className="text-[12px] font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                                        Quantity
                                    </p>

                                    <div className="flex items-center">
                                        <button
                                            className="qty-btn w-9 h-9 border border-green-100 bg-green-50 rounded-l-md text-[18px] text-green-700"
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        >
                                            −
                                        </button>

                                        <div className="w-12 h-9 border-t border-b border-green-100 flex items-center justify-center font-bold text-green-900">
                                            {quantity}
                                        </div>

                                        <button
                                            className="qty-btn w-9 h-9 border border-green-100 bg-green-50 rounded-r-md text-[18px] text-green-700"
                                            onClick={() => setQuantity(q => Math.min(10, q + 1))}
                                        >
                                            +
                                        </button>

                                        <span className="ml-2.5 text-[12px] text-gray-400">
                                            Max 10 per order
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Care Section */}
                            <div className="bg-white rounded-[16px] border border-green-100 p-5">
                                <div className="flex items-center gap-1.5 mb-3.5">
                                    <LeafIcon size={15} />
                                    <p className="text-[13px] font-bold text-green-700 uppercase tracking-wider">
                                        Plant Care at a Glance
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <CareTag icon="☀️" label="Sunlight" value="Bright Indirect" />
                                    <CareTag icon="💧" label="Watering" value="Weekly" />
                                    <CareTag icon="🌡️" label="Temp" value="18–30°C" />
                                    <CareTag icon="💨" label="Humidity" value="Moderate" />
                                    <CareTag icon="🪴" label="Difficulty" value="Easy" />
                                </div>
                            </div>

                            {/* Tabs Section */}
                            <div className="bg-white rounded-[16px] border border-green-100 overflow-hidden">

                                {/* Tabs Header */}
                                <div className="flex border-b border-green-50">
                                    {TABS.map((tab, i) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(i)}
                                            className={`flex-1 py-3 text-[13px] transition
                    ${activeTab === i
                                                    ? "bg-green-50 text-green-700 font-bold border-b-2 border-green-600"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                {/* Tabs Content */}
                                <div className="px-6 py-5">

                                    {/* ABOUT */}
                                    {activeTab === 0 && (
                                        <div>
                                            <p className="text-[14px] text-gray-600 leading-[1.85] mb-4">
                                                {product.description}
                                            </p>

                                            <div className="flex flex-col gap-2">
                                                {[
                                                    "Comes in a nursery pot with premium potting mix",
                                                    "Air-purifying — improves indoor air quality",
                                                    "Pet-friendly and non-toxic variety",
                                                    "Ideal for homes, offices, and balconies",
                                                    "Naturally grown without chemical pesticides",
                                                ].map(point => (
                                                    <div key={point} className="flex gap-2 text-[13px] text-gray-700">
                                                        <LeafIcon size={14} /> {point}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* CARE GUIDE */}
                                    {activeTab === 1 && (
                                        <div className="flex flex-col gap-3.5">
                                            {[
                                                { icon: "☀️", title: "Light", desc: "Bright indirect sunlight." },
                                                { icon: "💧", title: "Watering", desc: "Water once a week." },
                                                { icon: "🪴", title: "Potting", desc: "Repot every 1–2 years." },
                                                { icon: "🌿", title: "Fertilising", desc: "Monthly feeding." },
                                                { icon: "✂️", title: "Pruning", desc: "Trim dead leaves." },
                                            ].map(({ icon, title, desc }) => (
                                                <div key={title} className="flex gap-3">
                                                    <div className="w-9 h-9 bg-green-50 border border-green-100 rounded-md flex items-center justify-center text-[18px]">
                                                        {icon}
                                                    </div>
                                                    <div>
                                                        <p className="text-[13px] font-bold text-green-700">{title}</p>
                                                        <p className="text-[13px] text-gray-600">{desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* REVIEWS */}
                                    {activeTab === 2 && (
                                        <div className="flex flex-col gap-3">
                                            {[
                                                { name: "Sneha R.", rating: 5, text: "Amazing plant!", date: "14 Mar 2025" },
                                                { name: "Vikram P.", rating: 4, text: "Healthy and fresh.", date: "2 Feb 2025" },
                                                { name: "Meera T.", rating: 5, text: "Loved it!", date: "18 Jan 2025" },
                                            ].map(({ name, rating, text, date }) => (
                                                <div key={name} className="bg-green-50 border border-green-100 rounded-xl p-4">

                                                    <div className="flex justify-between mb-1">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-700 text-[13px]">
                                                                {name[0]}
                                                            </div>
                                                            <span className="text-[13px] font-semibold text-green-800">{name}</span>
                                                        </div>
                                                        <span className="text-[11px] text-gray-400">{date}</span>
                                                    </div>

                                                    <StarRating rating={rating} />
                                                    <p className="text-[13px] text-gray-600 mt-2">{text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Trust Row */}
                            <div className="bg-white rounded-[14px] border border-green-100 px-5 py-3.5 flex flex-wrap gap-4 items-center">
                                {[
                                    { icon: "🌱", text: "Nursery direct" },
                                    { icon: "🔒", text: "Secure checkout" },
                                    { icon: "🌍", text: "Eco packaging" },
                                    { icon: "📞", text: "Plant expert support" },
                                ].map(({ icon, text }) => (
                                    <div key={text} className="flex items-center gap-1.5 text-[12px] text-gray-500">
                                        <span>{icon}</span> {text}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;