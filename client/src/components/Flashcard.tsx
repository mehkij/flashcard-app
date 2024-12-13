import { Card, CardContent } from "./ui/card"

// type CardProps = {
//     title: string
//     body: string
// }

function Flashcard() {
    return (
        <Card className="size-96">
            <CardContent className="flex flex-col justify-center items-center">
                <div>
                    <h1>Example</h1>
                    <p>Example lorem ipsum</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default Flashcard