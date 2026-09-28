import { useInView } from "../hooks/motion";

/* Fait apparaître son contenu en fondu/glissé quand il entre dans le viewport */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ "--d": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
