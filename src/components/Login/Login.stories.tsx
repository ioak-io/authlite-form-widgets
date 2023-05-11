import React, { useState } from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import { useAddonState } from '@storybook/api';
import Login, { LoginProps } from ".";

export default {
  title: "Form elements/Login",
  component: Login,
  argTypes: {
  },
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<LoginProps> = (args: LoginProps) => <Login {...args} />;

// Reuse that template for creating different stories
export const BasicLogin = Template.bind({});
BasicLogin.args = {
  label: "First name",
  value: "",
  placeholder: 'Lorem ipsum dolor sit',
};
