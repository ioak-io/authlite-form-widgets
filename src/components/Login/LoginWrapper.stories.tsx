import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from "react";
import Login, { LoginProps } from '.';
import ThemeType from '../types/ThemeType';
import LoginWrapper from './LoginWrapper';

const meta: Meta<typeof Login> = {
  title: "Form elements/Login",
  component: Login,
  argTypes: {
  },
} as Meta;

export default meta;
type Story = StoryObj<typeof Login>;


const Template: Story = {
  render: (args: LoginProps) => {
    return (
      <LoginWrapper {...args} />
    );
  },
};

export const Demo = {
  ...Template, args: {
  }
};
