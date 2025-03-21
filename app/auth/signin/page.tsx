"use client";

import { Button, Divider, Form, Image, Input, Link } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Component to handle search params safely
function SignInContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { status } = useSession();
  const error = searchParams.get("error");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-screen">
      <Button
        className="absolute top-4 left-4"
        size="sm"
        variant="bordered"
        startContent={
          <Icon icon="mdi:arrow-left" width={18} className="text-default-700" />
        }
        onPress={() => router.push("/")}
      >
        Retour
      </Button>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Connexion à Penfolio</h1>

        <p className="text-center text-default-500 my-3 w-1/3">
          Connectez-vous pour accéder à votre compte et créer des portfolios.
        </p>

        {error && (
          <p style={{ color: "red" }}>
            Une erreur est survenue lors de la connexion.
          </p>
        )}

        <Form
          method="post"
          action="/api/auth/callback/credentials"
          className="w-1/2 2xl:w-1/3 mt-6 flex flex-col space-y-1"
        >
          <Input
            name="email"
            type="email"
            required
            size="lg"
            placeholder="Email"
            startContent={
              <Icon icon="mdi:email" width={20} className="text-default-700" />
            }
          />

          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            startContent={
              <Icon icon="mdi:lock" width={20} className="text-default-700" />
            }
            required
            size="lg"
            placeholder="Mot de passe"
            endContent={
              <button
                type="button"
                className="text-default-700"
                onClick={togglePasswordVisibility}
              >
                <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} width={20} />
              </button>
            }
          />
          <Button type="submit" color="primary" className="w-full">
            Se connecter
          </Button>
        </Form>
        <Link href="/auth/signup" className="text-default-500 mt-4">
          Vous n&apos;avez pas de compte ? Inscrivez-vous
        </Link>
        <div className=" space-y-2">
          <Divider className="my-4" />
          <Button
            onPress={() => signIn("github")}
            startContent={<Icon icon="akar-icons:github-fill" width={20} />}
            className="bg-black text-white w-full flex items-center justify-center py-2 px-4 rounded-lg"
          >
            Se connecter avec GitHub
          </Button>
          {/* <Button
            onPress={() => signIn("google")}
            startContent={<Icon icon="flat-color-icons:google" width={20} />}
            className="bg-white text-black border border-gray-300 w-full flex items-center justify-center py-2 px-4 rounded-lg"
          >
            Se connecter avec Google
          </Button> */}
        </div>
      </div>
      <Image
        src="/Signin.jpg"
        alt="Logo"
        width={2000}
        height={2000}
        radius="lg"
        className="object-cover rounded-lg max-h-screen p-2"
        style={{ borderRadius: "30px" }}
      />
    </div>
  );
}

// Main page component with Suspense
export default function SignInPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SignInContent />
    </Suspense>
  );
}