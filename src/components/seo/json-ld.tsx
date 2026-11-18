type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Safe JSON-LD script for crawlers. Escapes `<` to avoid breaking out of the script tag. */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
