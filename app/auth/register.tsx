import React from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useAlert } from "@/hooks/useAlert";

const RegisterScreen = () => {
  const { register } = useAuth();
  const router = useRouter();
  const { showAlert } = useAlert();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm password is required"),
  });

  const onSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await register(values.name, values.email, values.password);
    } catch (error) {
      showAlert(JSON.stringify({ error }) || "Something went wrong!");
      console.error(error);
    }
  };

  return (
    <View className="flex-1 justify-center bg-green-500 px-6 py-4">
      <View className="bg-white p-8 rounded-2xl shadow-lg">
        <Text className="text-3xl font-extrabold text-green-500 text-center mb-6">
          Register for FairShare
        </Text>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 bg-gray-100"
                placeholder="Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {touched.name && errors.name && (
                <Text className="text-red-500 text-sm mb-4">{errors.name}</Text>
              )}

              <TextInput
                className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 bg-gray-100"
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text className="text-red-500 text-sm mb-4">
                  {errors.email}
                </Text>
              )}

              <TextInput
                className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 bg-gray-100"
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text className="text-red-500 text-sm mb-4">
                  {errors.password}
                </Text>
              )}

              <TextInput
                className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-gray-100"
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text className="text-red-500 text-sm mb-4">
                  {errors.confirmPassword}
                </Text>
              )}

              <TouchableOpacity
                className="w-full bg-green-500 py-3 rounded-lg mb-4"
                onPress={() => handleSubmit()}
              >
                <Text className="text-white text-center font-bold text-lg">
                  Register
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-full border border-green-500 py-3 rounded-lg"
                onPress={() => {
                  router.replace("/auth/login");
                }}
              >
                <Text className="text-green-500 text-center font-bold text-lg">
                  Already Registered? Login
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default RegisterScreen;
