export const POST = async (req: Request) => {
  const data = await req.json();
  console.log(data);
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};
