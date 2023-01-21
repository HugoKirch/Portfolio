import re


pattern = "([\w’'`\-áàâæéèêîôùç ]+), (\d+) (allée|avenue|boulevard|chemin|impasse|place|quai|rue|square) ([" \
          "\w’'`\-áàâæéèêîôùç ]+)"


class Address:
    def __init__(self, address):
        parsed_address = []
        if re.search(pattern, address) is not None:
            tmp = re.finditer(pattern, address)
            for match in tmp:
                parsed_address = match.groups()
        else:
            raise Exception("Invalid address")

        self.city = parsed_address[0]
        self.number = parsed_address[1]
        self.street_type = parsed_address[2]
        self.street_name = parsed_address[3]

    def splitted_street_name(self):
        return self.street_name.split()

    def splitted_city(self):
        return self.city.split()

    def get_full_address(self):
        return self.city + ", " + self.number + " " + self.street_type + " " + self.street_name
