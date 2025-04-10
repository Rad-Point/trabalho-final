interface ResponseType {
  content: string;
  type: "text" | "img";
}
[];
export const POST = async (req: Request) => {
  const data = await req.json();
  const response: ResponseType[] = [
    {
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod non justo eu rhoncus. Morbi
      mollis at nulla quis finibus. Aenean a nulla massa. Morbi in nulla quis arcu scelerisque pharetra. Donec euismod
      malesuada erat, ornare fringilla lorem mollis nec. Suspendisse facilisis molestie augue, non fringilla augue
      aliquet ac. Mauris hendrerit nibh et odio vestibulum ultrices. Sed pretium mi vel venenatis tristique. Proin
      tellus justo, molestie id nunc vel, scelerisque hendrerit tellus. Nullam condimentum mauris lectus, et consequat
      metus pulvinar vitae. Pellentesque mi purus, tempus sed quam vel, tristique semper leo.`,
      type: "text",
    },
    {
      content: `https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg`,
      type: "img",
    },
  ];
  // if (data.status !== 200) {
  //   return new Response("Erro", {
  //     headers: { "Content-Type": "text/html" },
  //     status: 401,
  //   });
  // }
  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};
