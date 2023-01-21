import collections
import re
import sys
from addressClass import Address


class Autocompletion:
    def __init__(self, array_address):
        self.addresses = []
        for address in array_address:
            try:
                self.addresses.append(Address(address))
            except Exception:
                print(address, file=sys.stderr)
                continue
        self.city = ""
        self.street_name = ""
        self.letters_city = []
        self.letters_street_name = []

    def print_all(self):
        for address in self.addresses:
            print(address.city + ", " + address.number + " " + address.street_type + " " + address.street_name)

    def filter(self):
        # filter the list of cities with the given letter
        if self.city == "":
            to_search = "\\b" + "".join(self.letters_city)
            my_list = list(set(self.get_cities()))
        elif self.street_name == "":
            to_search = "\\b" + "".join(self.letters_street_name)
            my_list = list(set(self.get_street_names()))
        else:
            raise Exception("Address already known")
        tmp = []
        for i in range(len(my_list)):
            if re.search(to_search, my_list[i], re.IGNORECASE) is not None:
                tmp.append(my_list[i])
        my_list = tmp
        pattern = "|".join(my_list)
        tmp = []
        for i in range(len(self.addresses)):
            if self.city == "":
                if re.search(str(pattern), str(self.addresses[i].city), re.IGNORECASE) is not None:
                    tmp.append(self.addresses[i])
            elif self.street_name == "":
                if re.search(str(pattern), str(self.addresses[i].street_name), re.IGNORECASE) is not None:
                    tmp.append(self.addresses[i])
            else:
                raise Exception("Invalid search type")
        self.addresses = tmp

        # check if there is one or zero matches

        if len(my_list) == 1 and self.city == "":
            self.city = my_list[0]
        elif len(my_list) == 1 and self.street_name == "":
            self.street_name = my_list[0]
        elif len(my_list) == 0:
            print("UNKNOWN ADDRESS", file=sys.stderr)
            sys.exit(84)

        # check if a word is complete:
        if self.street_name == "" and self.city != "" and len(self.addresses) > 1 and len(self.letters_street_name) > 0:
            tmp = []
            pattern = str(to_search + "\\b")
            for i in range(len(self.addresses)):
                if re.search(str(pattern), str(self.addresses[i].street_name), re.IGNORECASE) is not None:
                    tmp.append(self.addresses[i])
            if len(tmp) > 0:
                self.complete_address_suggestion(tmp)

    def complete_address_suggestion(self, addresses):
        addresses_string = []
        for address in addresses:
            addresses_string.append(address.get_full_address())
        addresses_string.sort()
        for i in range(len(addresses_string)):
            print("{" + str(i + 1) + " : " + addresses_string[i].upper() + "}", end=" ")
        print()
        client_input = input()
        try:
            nb = int(client_input)
        except ValueError:
            if len(client_input) > 1:
                print("Invalid argument", file=sys.stderr)
                return
            self.letters_street_name.append(client_input)
            self.filter()
            return
        try:
            selected = addresses_string[nb - 1]
        except IndexError:
            print("Invalid argument", file=sys.stderr)
            self.complete_address_suggestion(addresses)
            return
        print("=> " + selected)
        sys.exit(0)

    def compute_word_for_letter_suggestion(self):
        if self.city == "":
            letters = "".join(self.letters_city)
            my_list = self.get_cities()
        elif self.street_name == "":
            letters = "".join(self.letters_street_name)
            my_list = self.get_street_names()
        else:
            raise Exception("Address already known")

        tmp = []
        for element in my_list:
            tmp_element = element.split()
            for word in tmp_element:
                if re.search(letters, word, re.IGNORECASE) is not None:
                    tmp.append(word)
        self.print_most_probable_letters(tmp, len(letters), letters)

    def print_most_probable_letters(self, my_list=None, letter_position=0, letter_list=""):
        if my_list is None:
            my_list = self.get_cities()
        letters_list = []
        for element in my_list:
            tmp = element.split()
            for word in tmp:
                try:
                    letters_list.append(word[letter_position])
                except IndexError:
                    continue
        letters_list = (map(lambda x: x.lower(), letters_list))
        letters_count = collections.Counter(letters_list)
        my_sorted = sorted(letters_count.items(), key=lambda item: (-item[1], item[0]))
        first_loop = True
        for letter, count, in my_sorted:
            if first_loop:
                if self.city == "":
                    print("{" + letter_list.upper() + letter + "}", end="")
                else:
                    print("{" + self.city.upper() + ", " + letter_list.upper() + letter + "}", end="")
                first_loop = False
            else:
                if self.city == "":
                    print(" {" + letter_list.upper() + letter + "}", end="")
                else:
                    print(" {" + self.city.upper() + ", " + letter_list.upper() + letter + "}", end="")

            if my_sorted.index((letter, count)) >= 4:
                break
        print()

    def get_cities(self):
        cities = []
        for address in self.addresses:
            cities.append(address.city)
        return cities

    def get_street_names(self):
        street_names = []
        for address in self.addresses:
            street_names.append(address.street_name)
        return street_names
