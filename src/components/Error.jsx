export default function ErrorPage({error}) {
    return (
        <div className={"error-page"}>
            <div className={"oops"}>Oops!</div>
            <div className={"message"}>{error}</div>
        </div>
    );
}