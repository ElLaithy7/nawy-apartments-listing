import useApartments from "@/hooks/useApartments";
import Container from "@/components/ui/containers/Container";
import ListSkeleton from "@/components/ui/skeletons/ListSkeleton";
import ApartmentsTable from "@/components/apartments/view/ApartmentsTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import Layout from "@/components/ui/layout/Layout";

export default function Home() {
  // Search logic
  const [search, setSearch] = useState("");

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  // apartments hook that fetches apartments and handles loading
  const { apartments, loading } = useApartments({ search });

  return (
    <Layout>
      <Container>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between gap-5">
            <h1>Apartments</h1>
            <Link className={buttonVariants()} href={"/apartments/add"}>
              Add Apartment
            </Link>
          </div>
          {/* Search */}
          <Input
            className="w-[400px]"
            type="search"
            placeholder="Search apartments..."
            value={search}
            onChange={handleSearch}
          />
          <ListSkeleton loading={loading}>
            <ApartmentsTable apartments={apartments} />
          </ListSkeleton>
        </div>
      </Container>
    </Layout>
  );
}
