import withProtection from 'hocs/WithProtection';

type WithProtectionOptions = {
   type: string;
};

type ComponentType = React.ComponentType<any>;

export const routeWithProtection = (
   Component: ComponentType,
   options: WithProtectionOptions
): JSX.Element => {
   const ProtectedComponent = withProtection(Component, options);
   return <ProtectedComponent />;
};
