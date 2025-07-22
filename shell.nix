{ 
  pkgs ? import <nixpkgs> {}
}:

pkgs.mkShellNoCC {
  packages = with pkgs; [
    nodejs_22
    pnpm
  ];

  NIX_SHELL=true;

  shellHook = ''
    export PS1="[\u-nix] yuda-blog $ ";
    export PNPM_HOME="$HOME/.local/share/pnpm"
    export PATH="$PNPM_HOME:$PATH"
    pnpm install
    pnpm run dev
  '';
}
