'use client';

import { IAuthForm } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { Heading } from "@/components/ui/Heading";
import { Field } from "@/components/ui/fields/Field";
import { Button } from "@/components/ui/buttons/Button";

const Auth = () => {
  const { register, handleSubmit, reset } = useForm<IAuthForm>({
    mode: 'onChange'
  });

  const [isLoginForm, setIsLoginForm] = useState(false);

  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? 'login' : 'register', data),
    onSuccess() {
      toast.success('Succesfully login!');
      reset();
      push(DASHBOARD_PAGES.HOME);
    }
  });

  const onSubmit: SubmitHandler<IAuthForm> = data => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen">
      <form
        className="w-1/4 m-auto shadow bg-sidebar rounded-xl p-layout"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading title="Auth" />

        <Field
          id="email"
          label="Email:"
          placeholder="Enter email:"
          type="email"
          extra="mb-4"
          {...register('email', {
            required: 'Email is required!'
          })}
        />

        <Field
          id="password"
          label="Password:"
          placeholder="Enter password:"
          type="password"
          extra="mb-6"
          {...register('password', {
            required: 'Password is required!'
          })}
        />

        <div className="flex items-center gap-5 justify-center">
          <Button onClick={() => setIsLoginForm(true)}>Login</Button>
          <Button onClick={() => setIsLoginForm(false)}>Register</Button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
