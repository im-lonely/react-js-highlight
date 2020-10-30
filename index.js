export const useFalse = (bools, val) => {
  bools.forEach((bool) => {
    bool.current = false;
  });
  return val || "";
};

export const usingTrue = (bools, val) => {
  bools.forEach((bool) => {
    bool.current = true;
  });
  return val || "";
};

export const useFlip = (bools, val) => {
  bools.forEach((bool) => {
    bool.current = !bool.current;
  });
  return val || "";
};

const useHighlight = (code, colors) => {
  const {
    normalName: normalColor,
    stringName: stringColor,
    className: classColor,
    keywordName: keywordColor,
    varName: varColor,
    propertyName: propertyColor,
  } = colors;

  let isString = useRef(false);
  let nextString = useRef(false);
  let currentString = useRef("");
  let isEscaped = useRef(false);
  let isProperty = useRef(false);
  let isObject = useRef(false);
  let escapeHighlight = useRef(false);
  let isClass = useRef(false);
  let isKeyword = useRef("");

  const keywords = [
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extend",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield",
  ];

  return (
    <code>
      {code.split("").map((piece) => {
        if (piece === "\\" && !isString.current) isEscaped.current = true;

        if (
          (piece === '"' || piece === "'" || piece === "`") &&
          isString.current &&
          piece === currentString.current
        ) {
          isString.current = false;
          nextString.current = true;
        } else if (
          (piece === '"' || piece === "'" || piece === "`") &&
          !isString.current
        ) {
          isString.current = true;
          currentString.current = piece;
        }

        if (!/[ .;[\]{}<>]/gi.test(piece) && !isObject.current)
          isProperty.current = !isProperty.current;
        else isObject.current = true;

        if (piece.toUpperCase() === piece) isClass.current = true;

        if (/[.,:;()[\]{}<>\-+*/=|&~!@#$%^&?]/.test(piece)) {
          escapeHighlight.current = true;
          isClass.current = false;
        } else escapeHighlight.current = false;

        if (!/[a-zA-Z]/.test(piece)) isKeyword.current += piece;
        else isKeyword.current = "";

        let highlight = isString.current
          ? stringColor || "#8c00ff"
          : isEscaped.current
          ? useFlip([isEscaped, isString], "string")
          : nextString.current
          ? useFalse([nextString], "string")
          : escapeHighlight.current
          ? normalColor || "#111111"
          : isClass.current
          ? classColor || "#0044ff"
          : keywords.includes(isKeyword.current)
          ? keywordColor || "#6542ff"
          : isObject.current
          ? varColor || "#0077ff"
          : !isObject.current && isProperty
          ? propertyColor || "#521dff"
          : normalColor || "#111111";

        return (
          <span style={{ color: highlight }} key={Math.random()}>
            {piece}
          </span>
        );
      })}
    </code>
  );
};

export default useHighlight;
