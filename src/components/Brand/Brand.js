import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '../Link';
import s from './Brand.css';

function Brand(){
  return (
    <Link className={s.brand} to="/" rel="nofollow" target="_blank">
    <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 769.9 769.9" height="100%" width="100%" version="1.1" y="0px" x="0px">
     <g fill="#241c1c" transform="matrix(0.88751309,0,0,0.90283159,-189.06802,228.13917)">
      <g transform="matrix(0.89154563,0,0,0.89154563,70.142893,-121.24877)">
       <path fill="white" d="m558.9,303.87c0.611-16.97-0.938-50.974,0.075-67.926,0.185-3.101-0.243-9.849,1.644-12.317,0.967-1.265,4.33-2.873,5.87-2.47,6.033,1.578,12.719,14.023,15.309,19.696,4.545,9.955,5.674,28.602,5.452,43.434-0.222,14.774,1.448,33.262,1.498,44.357,0.036,8.115-1.323,24.31-1.596,32.42-0.695,20.722-0.991,55.28-1.605,82.917-0.045,2.022-0.021,5.208-1.98,6.024-2.48,1.034-5.758-1.698-7.099-3.62-6.344-9.093-10.246-19.329-12.572-30.185-6.709-31.311-7.892-71.123-6.578-94.858,0.241-4.379,1.424-13.089,1.582-17.472zm-64.849-61.74c0.204-3.942,1.301-7.858,2.185-11.741,0.938-4.119,4.229-4.436,7.493-3.835,9.396,1.729,13.858,8.699,16.557,16.882,3.898,11.818,5.15,24.09,4.282,36.475-2.29,32.707-4.881,65.393-7.157,98.101-1.106,15.889,0.174,35.762,1.339,47.613,0.145,1.478,0.482,4.026,0.112,5.939-1.406,7.284-8.085,9.722-13.761,5.038-4.379-3.614-6.638-8.353-8.067-13.933-4.523-17.672-6.952-35.565-7.006-53.785-0.054-18.137-0.412-40.814-0.012-54.411,0.535-18.106,2.788-48.24,4.035-72.343zm-45.059,112.13c-0.788,29.456,2.397,56.707-1.929,78.38-0.294,1.474-0.811,5.021-2.2,5.595-1.771,0.732-5.66-1.722-7.022-3.07-7.922-7.84-12.258-27.259-14.743-42.073-3.307-19.719-4.811-39.554-4.117-59.635,1.126-32.611,1.41-65.25,2.134-97.875,0.081-3.644,0.532-7.305,1.137-10.904,0.533-3.175,2.905-4.189,5.607-2.876,6.4,3.11,12.087,9.885,14.025,14.551,3.198,7.699,5.873,24.383,6.612,32.687,1.106,12.425,1.966,49.859,1.966,49.859s-1.243,26.896-1.47,35.361zm-71.68-13.07c-0.887,31.628-1.831,64.435-2.694,97.244-0.108,4.106-1.645,7.151-5.49,8.653-4.07,1.59-6.588-1.052-8.939-3.767-5.396-6.233-6.554-14.086-8.073-21.739-6.246-31.476-8.579-63.358-9.095-95.364-0.46-28.485-1.612-64.15-0.18-85.469,0.475-7.073-0.252-22.206,3.656-28.12,0.805-1.219,3.589-3.169,5.035-2.966,7.398,1.041,17.427,14.901,20.568,21.68,7.865,16.98,5.407,49.641,5.226,74.668-0.083,11.33-0.014,22.662-0.014,35.18zm271.77-279.63s-330.73,82.945-337.98,84.783c-4.979,1.262-5.144,4.3565-1,7.3125,4.321,3.084,8.3905,5.9192,12.688,8.9062,2.615,1.818,3.6562,4.924,3.6562,6.875v29.188h322.63l0.00044-137.06zm-328.52,401.32l-107.53,44.906v31.719h434.63v-76.625z"/>
       <path fill="white" d="m953.48,243.78c-1.177,13.915-2.391,27.855-2.692,41.802-0.536,24.79-0.393,49.595-0.494,74.395-0.083,20.141,0.937,45.367-0.292,60.422-0.334,4.094-1.721,10.817-2.868,16.177-0.749,3.498-4.452,6.471-6.698,6.137-2.23-0.331-4.839-4.18-5.273-7.314-2.809-20.272-5.984-40.518-7.96-60.876-3.278-33.787-7.309-76.057-8.464-101.49-0.192-4.229-0.162-11.332,0.471-16.925,1.549-13.691,2.009-31.201,5.292-41.001,0.85-2.539,4.428-7.914,9.66-4.623,12.274,7.719,20.646,17.6,19.318,33.298zm-102.58-20.82c8.223-6.249,17.448,9.593,19.943,15.372,1.28,2.964,3.45,9.091,4.042,12.264,5.091,27.287,5.392,83.134,5.608,110.89,0.078,9.99-0.932,26.621-1.391,39.936-0.303,8.805-0.368,17.642-1.296,26.385-0.277,2.609-2.969,5.07-4.891,7.31-0.403,0.469-2.728-0.145-3.462-0.629-0.511-0.337-1.151-1.238-1.415-1.996-5.064-14.567-12.176-28.717-12.876-44.351-2.145-47.915,0.596-108.32-5.377-143.79-0.888-5.28-5.144-16.635,1.115-21.391zm-43.248,97.238c0.442,27.89-4.101,57.184-6.036,86.557-0.456,6.929-0.012,13.914-0.387,20.852-0.152,2.813-0.75,5.991-2.263,8.257-2.905,4.353-6.241,3.715-9.094-0.798-8.393-13.276-9.892-28.412-11.825-43.399-6.86-53.202-4.599-106.7-4.947-160.11-0.01-1.487,0.093-3.01,0.408-4.459,1.333-6.123,7.857-5.524,10.174-4.064,7.771,4.898,15.688,19.605,17.24,32.447,2.537,20.967,6.368,41.897,6.73,64.713zm-106.95-105.44c8.091-5.818,18.504,8.156,22.212,13.492,4.019,5.784,7.054,17.372,9.006,26.694,5.806,27.724,7.094,55.851,6.478,83.943-0.582,26.558-3.388,53.065-5.053,79.604-0.29,4.616,0.011,9.304,0.439,13.922,0.44,4.756-1.593,8.385-6.728,9.959-4.622,1.416-5.834-2.701-6.886-5.509-7.313-19.51-16.316-38.39-16.42-60.115-0.127-26.437-1.738-52.867-2.75-79.299-0.809-21.122-1.888-42.237-2.397-63.367-0.146-6.061-3.755-15.114,2.099-19.324zm-40.096,385.31v-137.06h319.45v29.188c0,1.951,1.0412,5.057,3.6562,6.875,4.297,2.987,8.3675,5.8232,12.688,8.9062,4.143,2.957,3.9478,6.0505-1.0312,7.3125zm-1.3442-401.31v-76.625h421.26v31.719l-107.53,44.906z"/>
      </g>
     </g>
    </svg>

    </Link>
  )
}

export default withStyles(s)(Brand);
