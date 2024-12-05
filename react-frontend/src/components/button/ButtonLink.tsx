'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';

type ButtonLinkProps = {
  key?: number;
  btnText?: string;
  url?: string;
  target?: string;
  icon1?: ReactNode;
  icon2?: ReactNode;
  classes?: string;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({
  key = null,
  btnText = '',
  url = '/',
  target = '',
  icon1 = null,
  icon2 = null,
  classes = '',
}) => {

  return (
    <Link
      key={key}
      href={url}
      target={target}
      className={`flex items-center justify-center ${classes}`}
    >
      {icon1 && <span>{icon1}</span>}
      {btnText}
      {icon2 && <span>{icon2}</span>}
    </Link>
  );
};

export default ButtonLink;
