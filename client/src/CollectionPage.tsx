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
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Card from "./types/card";
import { format } from "date-fns";

const queryClient = new QueryClient();

type TableProps = {
  caption: string;
};

type TableEntryProps = {
  id: number;
  cardName: string;
  description: string;
  lastTested: string;
};

function CollectionPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Nav />
      <NewTable caption="Here are your recent cards!" />
    </QueryClientProvider>
  );
}

function NewTable({ caption }: TableProps) {
  const { isPending, error, data } = useQuery<Card[]>({
    queryKey: ["cards"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/api/cards");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    },
  });

  if (isPending) return "Loading card data...";
  if (error) return "An error has occurred: " + error.message;

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
      {data.map((card) => (
        <TableEntry
          cardName={card.title}
          description={card.description}
          lastTested={
            card.last_tested == "0001-01-01T00:00:00Z"
              ? "Not Tested"
              : format(new Date(card.last_tested), "M/d/yyyy")
          }
          id={card.id}
          key={card.id}
        />
      ))}
    </Table>
  );
}

function TableEntry({
  cardName,
  description,
  lastTested,
  id,
}: TableEntryProps) {
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:8080/api/cards/" + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    },

    onSuccess: () => {
      // Trigger a refetch of the cards
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error) => {
      console.error("Error deleting card:", error);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cards"] });

      const previousCards = queryClient.getQueryData<Card[]>(["cards"]);

      queryClient.setQueryData(["cards"], (old: Card[] | undefined) =>
        old?.filter((card) => card.id !== id)
      );

      return { previousCards };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });

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
            onConfirm={() => mutation.mutate()}
            destructive={true}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default CollectionPage;
