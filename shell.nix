{ 
  pkgs ? import <nixpkgs> {}
}:

pkgs.mkShellNoCC {
  packages = with pkgs; [
    nodejs_22
  ];

  NIX_SHELL=true;

  shellHook = ''
    export PS1="[\u-nix] yuda-blog $ ";
    npm config set cache $(mktemp -d)
    npm config set prefix $(mktemp -d)
    npm i -g npm@latest
    npm run dev
  '';
}
