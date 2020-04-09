import React, { useState, useEffect, memo} from 'react'
import Layouts from '../components/Layouts';

const About = () => {
    const [adet, adediAta] = useState(0);

    return (
      <Layouts>
      <div>
        <p>{adet} kere tıkladınız.</p>
        <button onClick={() => adediAta(adet + 1)}>Tıkla</button>
      </div>
      </Layouts>
    );
}

export default memo(About);