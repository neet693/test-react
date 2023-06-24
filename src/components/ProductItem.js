import React from 'react';

const ProductItem = ({
    title,
    description,
    mentor,
    company,
    rating,
    total_review,
    current_price,
    original_price,
    course_length,
    total_lesson,
    level,
    image,
    created_date,
    }) => {
    const renderRating = () => {
        const stars = [];
        const roundedRating = Math.round(rating * 2) / 2; // Round the rating to the nearest number
            // Add full stars
            for (let i = 0; i < Math.floor(roundedRating); i++) {
            stars.push(<span key={`star-${i}`} src="star-half.png" className="star"><img width="20" height="20" src="https://img.icons8.com/fluency/48/star.png" alt="star"/></span>);
            }
            // Add half star if applicable
            if (roundedRating % 1 !== 0) {
            stars.push(<span key={`star-${roundedRating}`} src="star-half.png" className="star"><img width="20" height="20" src="https://img.icons8.com/color/48/star-half-empty.png" alt="star-half-empty"/></span>);
            }
        return stars;
        };
    const isNewProduct = () => {
        const today = new Date();
        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
        return created_date >= startOfWeek && created_date <= endOfWeek;
    };

    const isBestSeller = () => {
    return total_review > 20 && rating > 4;
    };
    
    return (
    <div className="card card-side bg-base-100 shadow-xl mt-1 py-8 hover:cursor-pointer">
    <figure><img src={image} alt={title} /></figure>
        <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
            <p>{mentor}, {company}</p>
            <div className="rating rating-lg rating-half text-gold">
                {rating && total_review > 0 ? (
                    <> 
                    <span className='text-xl font-bold text-orange-600 mr-2'>{rating}</span> {renderRating()}
                <span className='total-review'>({total_review})</span>
                </>
                    ) : (
                    <span className='no-review'>No Review Yet</span>
                )}
            </div>
            <p> {course_length} total jam • {total_lesson} pelajaran • {level}</p>
            {isBestSeller() && isNewProduct() ? (
            <> 
                <div className="badge badge-error text-white font-bold">Hot Lesson</div>
            </>
                ) : isNewProduct() ? (
                    <div className="badge badge-success text-white font-bold">New</div>
                ) : isBestSeller() ? (
                    <div className="badge badge-accent text-white font-bold">Best Seller</div>
                ) : ''
            }
        </div>
        <div className="card-body flex flex-col items-end">
            <span className='text-2xl font-bold'>Rp{current_price}</span>
            <span className='text-xl line-through'>Rp{original_price}</span>
        </div>
    </div>
    );
};

export default ProductItem;
