import Link from "next/link";

const myClasses = {
  link : "border-2 border-dotted rounded-lg border-white px-4 py-2 my-4 mx-2"
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <section className="flex flex-col h-max w-max">
        <Link className={myClasses.link} href={"/dynamicallyAddKeysToObjects"}>
          Dynamically Add Keys to Objects
        </Link>
        <Link className={myClasses.link} href={"/register-page"}>
          Register Page (React Library Test)
        </Link>
      </section>
    </main>
  );
}
