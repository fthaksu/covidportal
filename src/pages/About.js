import React, { useState, useEffect, memo} from 'react'

const About = () => {
    const [adet, adediAta] = useState(0);

    return (
      <div>
        <p>{adet} kere tıkladınız.</p>
        <button onClick={() => adediAta(adet + 1)}>Tıkla</button>
      </div>
    );
}

export default memo(About);