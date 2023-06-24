import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const convertToSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, "-");
};

const DetailProduct = ({ products }) => {
  const { slug } = useParams();
  const product = products.find((item) => convertToSlug(item.title) === (slug));

  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };


  if (!product) {
    return <div>Loading...</div>;
  }

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

  const { title, current_price, description, mentor, company, rating, total_review, image, created_date } = product;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${title}, ${mentor}, ${company}`} />
      </Helmet>
      <figure> <img src={image} alt={title} /></figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">Rp{current_price}</div>
        </h2>
        <p>{description}</p>
        <div className="rating">
            {rating && total_review > 0 ? (
                <> 
                <span className='text-xl font-bold text-orange-600 m-2'>{rating}</span> {renderRating()}
                <span className='text-md font-semibold m-2'>({total_review})</span>
            </>
                ) : (
                <span className='text-md font-semibold'>No Review Yet</span>
            )}
            <div className={`${isWishlisted ? "wishlisted" : ""} ml-20 hover:cursor-pointer`}>
              <span className={`heart-icon ${isWishlisted ? "active" : ""}`} onClick={handleWishlistToggle}>
                {isWishlisted ? (
                <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FB0000/like--v1.png" alt="liked"/>
                ) : (
                  <img width="30" height="30" src="https://img.icons8.com/ios/50/FB0000/like--v1.png" alt="like"/>
                )}
              </span>
            </div>
          </div>
        <div className="card-actions justify-start">
          <div className="badge badge-primary badge-outline font-semibold">
              {isBestSeller() && isNewProduct() ? (
              <> 
              <span >Hot Lesson</span>
              </>
                  ) : isBestSeller ?(
                    <span>Best Seller</span>
              ) : (
                <span>NEW</span>
              )
              }
          </div> 
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
