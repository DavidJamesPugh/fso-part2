
const PartsSum = ({parts}) => {

    const totalEx =  parts.reduce((sum,totalAmount) => sum+totalAmount,0)
    return (
        <>
           <b>Total of {totalEx} exercises </b>
        </>
    )
}
export default PartsSum