import { Link } from "react-router-dom";
import Nav from "./components/Nav";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Button } from "./components/ui/button";
import Alert from "./components/Alert";

type TableProps = {
  caption: string;
};

type TableEntryProps = {
  cardName: string;
  description: string;
  lastTested: string;
};

function CollectionPage() {
  return (
    <>
      <Nav />
      <NewTable caption="Here are your recent cards!" />
    </>
  );
}

function NewTable({ caption }: TableProps) {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Card</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Last Tested</TableHead>
        </TableRow>
      </TableHeader>
      <TableEntry
        cardName="Example Card"
        description="An example card..."
        lastTested="12/13/2024"
      />
      <TableEntry
        cardName="Example Card #2"
        description="Some random card..."
        lastTested="N/A"
      />
    </Table>
  );
}

function TableEntry({ cardName, description, lastTested }: TableEntryProps) {
  return (
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">{cardName}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell className="text-right">{lastTested}</TableCell>
        <TableCell className="text-right space-x-4">
          <Button asChild>
            <Link to="#">Edit</Link>
          </Button>
          <Alert
            actionName="Delete"
            title="Are you sure you want to delete this card?"
            description="This will delete the card permanently! Please note that this action cannot be undone."
            trigger={<Button className="bg-red-600">Delete</Button>}
            destructive={true}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default CollectionPage;
