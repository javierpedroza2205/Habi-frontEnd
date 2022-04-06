import React from 'react';
import PropTypes from 'prop-types';
import './countries.scss';

const countries = props => (
	<div className="country">
      <table>
        <tr>
          <th>Nombre del Pais</th>
        </tr>
		{props.countries_list.map((val) => {
            return(
				<tr>
					<td>{val}</td>
				</tr>
			)
        })}
      </table>
    </div>
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class countries extends React.Component {
//   render() {
//     return <div>This is a component called countries.</div>;
//   }
// }

const CountriesPropTypes = {
	// always use prop types!
};

countries.propTypes = CountriesPropTypes;

export default countries;
