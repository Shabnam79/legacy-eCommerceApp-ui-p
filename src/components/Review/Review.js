import { useParams } from "react-router-dom"

const Review = () => {
    let { orderId } = useParams();
    alert(orderId);

    return "Review";
}

export default Review;