import { Tables } from "@/types/supabase";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useRouter } from "next/router";

type Props = {
  apartments: Tables<"apartments">[];
};

export default function ApartmentsTable({ apartments }: Props) {
  const router = useRouter();
  function handleRowClick(apartmentId: number) {
    router.push(`/apartments/${apartmentId}`);
  }

  return (
    <Table>
      <TableCaption>List of available apartments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>Project</TableHead>
          <TableHead className="text-right">Listed on</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apartments && apartments.length > 0 ? (
          apartments.map((apartment) => (
            <TableRow
              className="cursor-pointer"
              key={apartment.id}
              onClick={() => {
                handleRowClick(apartment.id);
              }}
            >
              <TableCell className="font-medium">{apartment.name}</TableCell>
              <TableCell>{apartment.number}</TableCell>
              <TableCell>{apartment.project}</TableCell>
              <TableCell className="text-right">
                {format(apartment.created_at, "PPP")}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <div className="flex justify-center m-auto w-full p-4">
            <h3>No apartments found.</h3>
          </div>
        )}
      </TableBody>
    </Table>
  );
}
