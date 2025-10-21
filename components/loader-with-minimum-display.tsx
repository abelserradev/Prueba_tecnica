'use client';

import { useEffect, useState } from 'react';
import Loader from './loader';

interface LoaderWithMinimumDisplayProps {
  minimumDisplayTime?: number;
}

export default function LoaderWithMinimumDisplay({ 
  minimumDisplayTime = 800 
}: LoaderWithMinimumDisplayProps) {
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShow(false);
    }, minimumDisplayTime);

    return () => clearTimeout(timer);
  }, [minimumDisplayTime]);

  if (!shouldShow) {
    return null;
  }

  return <Loader />;
}

