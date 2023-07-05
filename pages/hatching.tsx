import Head from "next/head";

const Address: React.FC = () => {
  return (
    <>
      <Head>
        <title>Address</title>
      </Head>
      <div className="p-3 my-4">
        <h1 className="my-4 text-3xl underline">software</h1>
        <p>{`- {name: adobe11}`}</p>
        <p>{`- {name: chrome}`}</p>
        <p>{`- {name: firefox}`}</p>
        <p>{`- {name: python2}`}</p>
        <p>{`- {name: python3}`}</p>
        <p>{`- {name: skype}`}</p>
        <p>{`- {name: office2016, vars: {licenseKey: "36RP3-NCRRD-8C3BH-2XX28-W44HM"}}`}</p>
        <h1 className="my-4 text-3xl underline">Restart</h1>
        <p>
          systemctl restart hatching-triage hatching-sandbox-net
          hatching-sandbox hatching-vms triage-frontend nginx
        </p>
        <p>https://hatching.dev/install-docs/sandbox/</p>
        <p>systemctl restart hatching-sandbox-net</p>
        <p>systemctl start hatching-sandbox-net</p>
        <p>systemctl start hatching-sandbox</p>
        <p>systemctl start hatching-vms</p>

        <p>hatching-vms build</p>
        <p>journalctl -u hatching-vms -f</p>
        <p>systemctl restart hatching-sandbox-net hatching-sandbox</p>
        <p>
          systemctl status hatching-sandbox-net systemctl status
          hatching-sandbox ls -al /var/lib/sandbox/logs
        </p>
        <h1 className="my-4 text-3xl underline">URL</h1>
        <p className="mt-4">
          wget https://deploy.hatching.io/pkg/kymo/470feda2198c727c/hatching.gpg
          -O /etc/apt/trusted.gpg.d/hatching.gpg
        </p>
        <p className="mt-4">
          {
            "echo deb https://deploy.hatching.io/pkg/kymo/470feda2198c727c ./ > /etc/apt/sources.list.d/hatching.list"
          }
        </p>
        <p className="mt-4">
          {`echo 'APT::Install-Recommends "false";' >> /etc/apt/apt.conf.d/99norecommend`}
        </p>
        <p className="mt-4">
          {`echo 'APT::Install-Recommends "false";' >> /etc/apt/apt.conf.d/99norecommend`}
        </p>
        <p className="mt-4">Windows 7</p>
        <p>
          {`https://hatching.dev/install-docs/hatchingvms-examples/win7.yaml`}
        </p>
        <p className="mt-4">Windows 10 build 1703</p>
        <p>
          {`https://hatching.dev/install-docs/hatchingvms-examples/win10.yaml`}
        </p>
        <p className="mt-4">Windows 10 build 2004</p>
        <p>
          {`https://hatching.dev/install-docs/hatchingvms-examples/win10v2004.yaml`}
        </p>
        <p className="mt-4">Android 11</p>
        <p>
          {`https://hatching.dev/install-docs/hatchingvms-examples/android11-x64-arm64.yaml`}
        </p>
        <p className="mt-4">Android 10</p>
        <p>
          {`https://hatching.dev/install-docs/hatchingvms-examples/android10-x64.yaml`}
        </p>
        <p className="mt-4">Android 9</p>
        <p>
          {`https://hatching.dev/install-docs/hatchingvms-examples/android9-x86-arm.yaml`}
        </p>
        <p className="mt-4">Ubuntu 18.04</p>
        <p>
          {`https://hatching.dev/install-docs/hatchingvms-examples/ubuntu1804-amd64.yaml`}
        </p>
        <p className="mt-4">Debian 9 ARMhf</p>
        <p>
          {`https://hatching.dev/install-docs/hatchingvms-examples/debian9-armhf.yaml`}
        </p>
        <p className="mt-4">Debian 9 MIPS</p>
        <p>
          {`https://hatching.dev/install-docs/hatchingvms-examples/debian9-mips.yaml`}
        </p>
        <p className="mt-4">Debian 9 MIPSEL</p>
        <p>
          {`https://hatching.dev/install-docs/hatchingvms-examples/debian9-mipsel.yaml`}
        </p>
        <p className="mt-4">Google DNS</p>
        <p>{`8.8.8.8,8.8.4.4`}</p>
        <p>{`2001:4860:4860::8888,2001:4860:4860::8844`}</p>
      </div>
    </>
  );
};

export default Address;
