import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product)
        return <div className="text-center min-h-screen text-4xl bg-green-50 mt-10">L o a d i n g . . .</div>;

    return (
        <section className="min-h-70vh bg-green-50 py-5 px-6 md:px-20 select-none cursor-default">
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
                    <button className="cursor-pointer bg-secondary text-white px-8 py-3 rounded-xl hover:bg-green-700 text-lg">
                        Add to Cart
                    </button>
                </div>
            </div>

        </div>
        </section>
    );
};

export default ProductPage;
