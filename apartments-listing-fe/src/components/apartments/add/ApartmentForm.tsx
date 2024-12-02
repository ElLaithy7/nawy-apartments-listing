import { Button } from "@/components/ui/button";
import Container from "@/components/ui/containers/Container";
import { Input } from "@/components/ui/input";
import InputContainer from "@/components/ui/inputs/InputContainer";
import { useToast } from "@/hooks/use-toast";
import useNeverthrowAsync from "@/hooks/useNeverthrowAsync";
import useYupValidation from "@/hooks/useYup";
import { addApartment } from "@/lib/apis/apartmentsApis";
import { Tables } from "@/types/supabase";
import { FormEvent, Fragment, useEffect, useState } from "react";
import * as Yup from "yup";

// apartment validation schema
const ApartmentSchema = Yup.object({
  name: Yup.string().required("Apartment name is required"),
  number: Yup.mixed()
    .transform((value) => (Number.isNaN(value) ? undefined : value))
    .required("Apartment number is required")
    .test(
      "is-number",
      "Value must be a number",
      (value) => !value || !isNaN(value as any)
    ),
  project: Yup.string().required("Project name is required"),
});

export default function ApartmentForm() {
  // toast
  const { toast } = useToast();

  // state to store apartment to submit in the end
  const [apartment, setApartment] = useState<Partial<Tables<"apartments">>>({
    name: "",
    number: NaN,
    project: "",
  });

  // validation logic
  const [shouldValidate, setShouldValidate] = useState(false);
  const { errors: apartmentErrors, validate: validateApartment } =
    useYupValidation(ApartmentSchema);

  useEffect(() => {
    if (shouldValidate) {
      validateApartment(apartment as any);
    }
  }, [apartment, shouldValidate]);

  // handle prop change function to handle input and state changes
  const handlePropertyChange = <K extends keyof Tables<"apartments">>(
    key: K,
    value: Tables<"apartments">[K]
  ) => {
    setApartment((prevApartment) => ({
      ...prevApartment,
      [key]: value,
    }));
  };

  // fields jsx array used to separate it from the return fragment
  const apartmentFieldsJsx = [
    {
      name: "name",
      Jsx() {
        return (
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="w-full sm:w-3/4">
              <InputContainer
                label={"Apartment Name"}
                error={apartmentErrors.name}
                required
              >
                <Input
                  className="w-full"
                  type="text"
                  placeholder="Apartment T1"
                  value={apartment.name || ""}
                  onChange={function passPropertyName(event) {
                    handlePropertyChange("name", event.target.value);
                  }}
                />
              </InputContainer>
            </div>
            <div className="w-full sm:w-1/4">
              <InputContainer
                label={"Apartment Number"}
                error={apartmentErrors.number}
                required
              >
                <Input
                  min={1}
                  className="w-full"
                  type="number"
                  placeholder="24"
                  value={apartment.number || ""}
                  onChange={function passPropertyName(event) {
                    handlePropertyChange("number", Number(event.target.value));
                  }}
                />
              </InputContainer>
            </div>
          </div>
        );
      },
    },
    {
      name: "project",
      Jsx() {
        return (
          <InputContainer
            label={"Project"}
            error={apartmentErrors.project}
            required
          >
            <Input
              className="w-full"
              type="text"
              placeholder="Sodic West"
              value={apartment.project || ""}
              onChange={function passPropertyName(event) {
                handlePropertyChange("project", event.target.value);
              }}
            />
          </InputContainer>
        );
      },
    },
  ];

  const [handleAddApartment, isAddApartmentLoading] = useNeverthrowAsync(
    async function addApartmentAsync(apartment: Partial<Tables<"apartments">>) {
      const addApartmentResult = await addApartment(
        apartment as Tables<"apartments">
      );
      return addApartmentResult;
    },
    {
      uiSuccessMessage: "Apartment added successfully",
      uiErrorMessage: "Failed to add apartment",
    }
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // 1. Validate
    setShouldValidate(true);
    const isApartmentDataValid = await validateApartment(apartment as any);
    if (!isApartmentDataValid) {
      return;
    }
    // 2. Submit
    handleAddApartment(apartment);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h2>Add Apartment</h2>
        {/* map fields */}
        {apartmentFieldsJsx.map(({ name, Jsx }) => (
          <Fragment key={name}>{Jsx()}</Fragment>
        ))}
        <div className="flex justify-end">
          <Button loading={isAddApartmentLoading}>Submit</Button>
        </div>
      </form>
    </Container>
  );
}
