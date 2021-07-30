module P = {
  @react.component
  let make = (~children) => <p className="mb-2"> children </p>
}

let default = () =>
  <div>
    <h1 className="text-3xl font-semibold"> {"What is this about?"->React.string} </h1>
    <P>
      {React.string(`Lorem ipsum ut eiusmod ullamco exercitation esse incididunt aute nostrud voluptate eiusmod dolor sint proident aute aliqua dolor exercitation et sit anim ad cupidatat in dolor reprehenderit ut velit laborum.`)}
    </P>
      <h2 className="text-2xl font-semibold mt-5"> {React.string("A CMS like site")} </h2>
    <P>
      {React.string(`Velit dolor id laborum sunt proident pariatur nisi culpa minim voluptate aliqua quis anim magna tempor incididunt sed dolore laboris excepteur sunt labore labore ex duis aliqua est eu nulla ad minim esse in nulla ea adipisicing aute excepteur enim dolore ex nostrud commodo cillum occaecat in cupidatat fugiat anim occaecat sit laboris adipisicing aliqua cillum deserunt ea nostrud elit excepteur irure ex magna dolor ut sed reprehenderit magna in ea labore ut in ea nulla irure cillum id incididunt in voluptate ad sit aliquip id in culpa ut laborum labore elit do nulla consequat dolore eu aute irure laborum consequat dolore commodo esse est duis consequat magna ut cupidatat ut dolor irure id dolor dolor dolor dolor eu ea reprehenderit nostrud sunt excepteur nostrud duis in enim elit laborum duis dolor adipisicing anim dolor ut dolor consequat velit consequat ut do aute reprehenderit laboris laborum exercitation elit dolor proident magna dolore ea sint aliqua nisi culpa tempor pariatur qui ut qui cupidatat ullamco fugiat tempor sunt irure ullamco culpa eiusmod et adipisicing pariatur sed aliquip reprehenderit laboris aute sunt aute ad in minim esse et veniam dolore minim sunt excepteur sit reprehenderit occaecat irure consequat officia anim esse magna nostrud consectetur enim cupidatat elit ad eiusmod nostrud ea quis anim nulla aute aliquip cupidatat in dolor sint cupidatat adipisicing minim do duis eu sunt ut tempor enim sit cupidatat mollit est amet enim veniam in dolor pariatur enim adipisicing do est nostrud in duis proident duis tempor dolore commodo quis sint excepteur labore cupidatat ullamco dolore non deserunt sed labore et sint.`)}
    </P>
    <h2 className="text-2xl font-semibold mt-5"> {React.string("Quick Start")} </h2>
    <pre> {React.string(`Hello World`)} </pre>
  </div>
