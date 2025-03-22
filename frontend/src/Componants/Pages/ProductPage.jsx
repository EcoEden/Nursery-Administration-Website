import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addToCartRedux } from "../../Redux/cartSlice";

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/products/${productId}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleAddToCart = async () => {
        const storedUser = JSON.parse(localStorage.getItem("user")) || {};
        const userId = user?._id || storedUser?._id;
        const token = user?.token || storedUser?.token;

        if (!userId) {
            alert("Please log in to add items to the cart.");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/cart/add",
                { userId, productId, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                dispatch(addToCartRedux({ ...product, quantity: 1 }));
                alert("Added to cart!");
            } else {
                alert("Failed to add to cart.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Error adding to cart.");
        }
    };

    if (!product)
        return <div className="text-center min-h-screen text-4xl bg-green-50 mt-10">L o a d i n g . . .</div>;

    return (
        <section className="min-h-70vh relative bg-green-50 py-5 px-6 md:px-20 select-none cursor-default">
            <div className="max-w-5xl mx-auto p-6 pt-12 select-none cursor-default bg-green-50">
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="w-full h-96">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-2xl shadow-lg"
                        />
                    </div>
                    <div className="mt-6">
                        <h1 className="text-4xl font-bold mb-5">{product.name}</h1>
                        <p className="text-lg text-gray-700 mb-5">{product.description}</p>
                        <p className="text-xl font-semibold text-secondary mb-3">
                            ₹{product.price}.00/-
                        </p>
                        <p className="text-base text-gray-500 mb-6">
                            Category: {product.category}
                        </p>
                        <button
                            onClick={handleAddToCart}
                            className="cursor-pointer bg-secondary text-white px-8 py-3 rounded-xl hover:bg-green-700 text-lg"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductPage;
