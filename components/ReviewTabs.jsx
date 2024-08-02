import React from "react";
import { useState } from "react";
import Link from "next/link";
import Ratings from "./Ratings";


const ProductTabs = ({
    loadingProductReview,
    userInfo,
    submitHandler,
    rating,
    setRating,
    comment,
    setComment,
    product,
}) => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <div className="review-tabs-container">
            <section className="review-tabs-heading">
                <div
                    className={`${activeTab === 1 ? "review-tabs-heads" : "review-tabs-head"
                        }`}
                    onClick={() => handleTabClick(1)}
                >
                    Write Your Review
                </div>
                <div
                    className={`${activeTab === 2 ? "review-tabs-heads" : "review-tabs-head"
                        }`}
                    onClick={() => handleTabClick(2)}
                >
                    All Reviews
                </div>

            </section>

            {/* Second Part */}
            <section>
                {activeTab === 1 && (
                    <div className="mt-4">
                        {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <div className="my-2">
                                    <label htmlFor="rating" className="block text-xl mb-2">
                                        Rating
                                    </label>

                                    <select
                                        id="rating"
                                        required
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                        className="p-2 border rounded-lg xl:w-[40rem] text-black"
                                    >
                                        <option value="">Select</option>
                                        <option value="1">★ </option>
                                        <option value="2">★★</option>
                                        <option value="3">★★★</option>
                                        <option value="4">★★★★</option>
                                        <option value="5">★★★★★</option>
                                    </select>
                                </div>

                                <div className="my-2">
                                    <label htmlFor="comment" className="block text-xl mb-2">
                                        Comment
                                    </label>

                                    <textarea
                                        id="comment"
                                        rows="3"
                                        required
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="p-2 border rounded-lg xl:w-[40rem] text-black"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loadingProductReview}
                                    className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                                >
                                    Submit
                                </button>
                            </form>
                        ) : (
                            <p>
                                Please sign in to write a review<br></br>
                                <Link href="/LoginPage">
                                <span style={{ textDecoration: 'underline' }}>LOGIN</span>
                                </Link>
                            </p>
                        )}
                    </div>
                )}
            </section>

            <section>
                {activeTab === 2 && (
                    <>
                        <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>

                        <div>
                            {product.reviews.map((review) => (
                                <div
                                    key={review._id}
                                    className="bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                                >
                                    <div className="flex justify-between">
                                        <strong className="text-[#B0B0B0]">{review.name}</strong>
                                        <p className="text-[#B0B0B0]">
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                    </div>

                                    <p className="my-4">{review.comment}</p>
                                    <Ratings value={review.rating} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>


        </div>
    );
};

export default ProductTabs;
