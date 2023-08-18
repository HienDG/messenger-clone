import { useParams } from "next/navigation";
import { useMemo } from "react";

const isString = (payload: unknown): payload is string => {
   return typeof payload === "string";
};

const useSlug = () => {
   const params = useParams();

   const slug = useMemo(() => {
      if (isString(params.slug)) return params.slug;

      return "";
   }, [params.slug]);

   return slug;
};

export default useSlug;
