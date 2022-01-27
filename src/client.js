import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "xv50faou",
  dataset: "production",
  useCdn: true,
});
