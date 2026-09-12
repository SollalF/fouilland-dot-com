import { formatSourceCitation, type Source } from "../data/sources";

export function SourceCitationItem({ source }: { source: Source | undefined }) {
  if (!source) {
    return <li>Source metadata not yet added.</li>;
  }

  return (
    <li>
      {source.url ? (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline-offset-4 hover:underline"
        >
          {formatSourceCitation(source)}
        </a>
      ) : (
        formatSourceCitation(source)
      )}
      {source.doi ? (
        <>
          {" "}
          <a
            href={`https://doi.org/${source.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline-offset-4 hover:underline"
          >
            doi:{source.doi}
          </a>
        </>
      ) : null}
      {source.note ? <span> — {source.note}</span> : null}
      {source.scoreDerivation ? (
        <span className="block">
          Score derivation: {source.scoreDerivation}
        </span>
      ) : null}
    </li>
  );
}
