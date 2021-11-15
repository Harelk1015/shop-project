import ItemsContainer from '../components/homepage/ItemsContainer';

export default function Home(props) {
  return (
    <>
      <ItemsContainer header={'Cars'} items={props.items.cars} />
      <ItemsContainer header={'Vegetable'} items={props.items.vegis} />
      <ItemsContainer header={'Meat'} items={props.items.meats} />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    'https://react-http-60990-default-rtdb.europe-west1.firebasedatabase.app/items.json/'
  );
  const data = await res.json();

  return {
    props: { items: data },
  };
}
