#!/usr/bin/env python3
import sys

from utils import open_file
from autocompletionClass import Autocompletion


def loop():
    first_loop = True
    while True:
        if len(autocompletion.addresses) == 1:
            print("=> " + autocompletion.addresses[0].get_full_address())
            sys.exit(0)
        if first_loop:
            autocompletion.print_most_probable_letters()
            first_loop = False
        else:
            autocompletion.compute_word_for_letter_suggestion()
        client_input = input()
        if client_input == "ABORT":
            sys.exit(0)
        if len(client_input) > 1:
            print("Invalid argument", file=sys.stderr)
            continue
        if autocompletion.city == "":
            autocompletion.letters_city.append(client_input)
        elif autocompletion.street_name == "":
            autocompletion.letters_street_name.append(client_input)
        autocompletion.filter()


autocompletion = Autocompletion(open_file().splitlines())


loop()
