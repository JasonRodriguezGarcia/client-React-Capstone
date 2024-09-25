// ALLOWING HOOKS IN CLASS COMPONENT
import { useNavigate, useParams, /* other hooks */ } from 'react-router-dom'; 

const withRouter = WrappedComponent => props => {
  const navigate = useNavigate();
  const params = useParams();
  // other hooks

  return (
    <WrappedComponent
      {...props}
      {...{ navigate, params, /* other hooks */ }}
    />
  );
};

export default withRouter;