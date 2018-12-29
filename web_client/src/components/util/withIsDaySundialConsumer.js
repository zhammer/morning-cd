import { withSundialConsumer } from 'components/withSundial/context';

const mapSundialToProps = sundial => ({
  isDay: sundial.calibrating || sundial.isDay
});

// wrapper around `withSundialConsumer` for morning cd components that just provides an `isDay` prop,
// which is true if it is day or if the sundial is still calibrating.
const withIsDaySundialConsumer = WrappedComponent => (
  withSundialConsumer(mapSundialToProps)(WrappedComponent)
);

export default withIsDaySundialConsumer;