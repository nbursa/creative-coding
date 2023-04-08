import Link from "next/link";

const Catalog = () => {
  return <div>
    <ul>
      <li>
        <Link href="/demo/flow-field">Flow Field</Link>
      </li>
      <li>
        <Link href="/demo/perlin-noise">Perlin Noise</Link>
      </li>
      <li>
        <Link href="/demo/fractal-noise">Fractal Noise</Link>
      </li>
    </ul>
  </div>
}

export default Catalog