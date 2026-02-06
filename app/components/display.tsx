import Card from './product_card'

interface Product {
  name?: string
  price?: string
  image?: string
}

interface Props{
  title?: string
  products: Product[]
}

function Display({title, products}: Props){
  return(
    <section>
      <h2>{title}</h2>
      <div>
        {products.map((p, i) => (
          <Card key={p.name ?? i} name={p.name} price={p.price} imagesrc={p.image} />
        ))}
      </div>
    </section>
    )
}

export default Display