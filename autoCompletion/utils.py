import sys


def open_file():
    if len(sys.argv) != 2:
        print("Invalid argument", file=sys.stderr)
        sys.exit(84)
    try:
        with open(sys.argv[1]) as f:
            return f.read()
    except FileNotFoundError:
        print("Invalid argument", file=sys.stderr)
        sys.exit(84)
