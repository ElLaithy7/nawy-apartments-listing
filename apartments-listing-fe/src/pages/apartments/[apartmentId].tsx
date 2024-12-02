import ApartmentSkeleton from "@/components/ui/skeletons/ApartmentSkeleton";
import useApartment from "@/hooks/useApartment";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/containers/Container";
import Layout from "@/components/ui/layout/Layout";

type Props = {
  apartmentId: string;
};

export default function ApartmentPage({ apartmentId }: Props) {
  const router = useRouter();
  const { apartment, loading } = useApartment(Number(apartmentId));

  if (!apartment && !loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>No apartment found with this id.</h2>
      </div>
    );
  }

  return (
    <Layout>
      <Container>
        <ApartmentSkeleton loading={loading}>
          <Card>
            <CardHeader>
              <CardTitle>{apartment?.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-muted-foreground">Apartment #:</p>
                <p>{apartment?.number}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Project:</p>
                <p>{apartment?.project}</p>
              </div>
            </CardContent>
          </Card>
        </ApartmentSkeleton>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context: {
  params: { apartmentId: string };
}) {
  const { apartmentId } = context.params;

  if (!apartmentId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      apartmentId,
    },
  };
}
