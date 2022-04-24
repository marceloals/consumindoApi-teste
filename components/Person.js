export const Person = ({ data }) => {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.birth_year}</p>
      <p>{data.gender}</p>
  </div>
  );
};

