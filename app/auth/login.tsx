import React from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useAlert } from "@/hooks/useAlert";

const LoginScreen = () => {
  const router = useRouter();
  const { login } = useAuth();
  const { showAlert } = useAlert();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      showAlert(JSON.stringify({ error }) || "Something went wrong!");
      console.error(error);
    }
  };

  return (
    <View className="flex-1 justify-center bg-green-500">
      <View className="bg-white mx-4 p-6 rounded-2xl shadow-lg">
        <Text className="text-3xl font-extrabold text-green-500 text-center mb-6">
          Welcome to FairShare
        </Text>

        <Formik
          initialValues={{ email: "", password: "" }}
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
                className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-3 bg-gray-100"
                placeholder="Email"
                placeholderTextColor="#999"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text className="text-red-500 text-sm mb-3">
                  {errors.email}
                </Text>
              )}

              <TextInput
                className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-3 bg-gray-100"
                placeholder="Password"
                placeholderTextColor="#999"
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

              <TouchableOpacity
                className="w-full bg-green-500 py-3 rounded-lg mb-4"
                onPress={() => handleSubmit()}
              >
                <Text className="text-white text-center font-bold text-lg">
                  Login
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-full border border-green-500 py-3 rounded-lg"
                onPress={() => router.replace("/auth/register")}
              >
                <Text className="text-green-500 text-center font-bold text-lg">
                  Register Now
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default LoginScreen;
